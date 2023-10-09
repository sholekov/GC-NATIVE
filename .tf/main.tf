# Terraform configuration to set up providers by version.
terraform {
  required_providers {
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
  }
}

# Configures the provider to use the resource block's specified project for quota checks.
provider "google-beta" {
  user_project_override = true
}

# Configures the provider to not use the resource block's specified project for quota checks.
# This provider should only be used during project creation and initializing services.
provider "google-beta" {
  alias = "no_user_project_override"
  user_project_override = false
}

# Creates a new Google Cloud project.
resource "google_project" "default" {
  provider   = google-beta.no_user_project_override

  name       = "GC Chat"
  project_id = "gc-chat-test-1"
  
  # org_id          = "123456789"
  billing_account = "000000-000000-000000"

  # Required for the project to display in any list of Firebase projects.
  labels = {
    "firebase" = "enabled"
  }
}

# resource "time_sleep" "wait_60_seconds" {
#   depends_on = [google_project.default]

#   create_duration = "60s"
# }

# Enables required APIs.
resource "google_project_service" "firestore" {
  provider = google-beta.no_user_project_override
  project  = google_project.default.project_id
  for_each = toset([
    "cloudbilling.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "firebase.googleapis.com",
    "firestore.googleapis.com",
    # Enabling the ServiceUsage API allows the new project to be quota checked from now on.
    "serviceusage.googleapis.com",
  ])
  service = each.key

  # Don't disable the service if the resource block is removed by accident.
  disable_on_destroy = false
}

# Enables Firebase services for the new project created above.
resource "google_firebase_project" "default" {
  provider = google-beta
  project  = google_project.default.project_id

  # Waits for the required APIs to be enabled.
  depends_on = [
    google_project_service.firestore,
    # time_sleep.wait_60_seconds,
  ]
}

resource "google_firebase_web_app" "basic" {
    provider = google-beta
    project = google_project.default.project_id
    display_name = "GC Chat App"

    # Waits for the required APIs to be enabled.
    depends_on = [
      google_project_service.firestore,
      google_firebase_project.default,
      # time_sleep.wait_60_seconds,
    ]
}


data "google_firebase_web_app_config" "basic" {
  provider   = google-beta
  project = google_project.default.project_id
  web_app_id = google_firebase_web_app.basic.app_id
}

# resource "google_storage_bucket" "default" {
#     provider = google-beta
#     project = google_project.default.project_id
#     name     = "fb-webapp-gcchat-test-8310-1-3"
#     location = "US"
# }

# resource "google_storage_bucket_object" "default" {
#     provider = google-beta
#     bucket = google_storage_bucket.default.name
#     name = "firebase-config.json"

#     content = jsonencode({
#         appId              = google_firebase_web_app.basic.app_id
#         apiKey             = data.google_firebase_web_app_config.basic.api_key
#         authDomain         = data.google_firebase_web_app_config.basic.auth_domain
#         databaseURL        = lookup(data.google_firebase_web_app_config.basic, "database_url", "")
#         storageBucket      = lookup(data.google_firebase_web_app_config.basic, "storage_bucket", "")
#         messagingSenderId  = lookup(data.google_firebase_web_app_config.basic, "messaging_sender_id", "")
#         measurementId      = lookup(data.google_firebase_web_app_config.basic, "measurement_id", "")
#     })
# }

# Creates a /Firebase Firestore/ App in the new project created above.
resource "google_firestore_database" "database" {
  project                           = google_project.default.project_id
  name                              = "(default)"
  location_id                       = "nam5" // europe-west6
  type                              = "FIRESTORE_NATIVE"
  concurrency_mode                  = "OPTIMISTIC"
  app_engine_integration_mode       = "DISABLED"
  point_in_time_recovery_enablement = "POINT_IN_TIME_RECOVERY_ENABLED"

  depends_on = [
      google_project_service.firestore,
    ]
}