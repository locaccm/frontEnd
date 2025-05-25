module "service_account_frontend-service" {
  source       = "./modules/service_account"
  account_id   = "frontend-service"
  display_name = "Frontend Service Account"
  project_id   = "intricate-pad-455413-f7"
  roles        = [
    "roles/cloudsql.client",
    "roles/storage.objectViewer"
  ]
}