module "cloud_run_frontend-service" {
  source                = "./modules/cloud_run"
  project_id            = "intricate-pad-455413-f7"
  region                = "europe-west1"
  service_name          = "frontend-service"
  repository_id         = "locaccm-repo-docker"
  service_account_email = module.service_account_frontend-service.email
  vpc_connector         = module.vpc_connector.id
  public                = false

  env_variables = {
    NODE_ENV = "production"
  }
}

module "cloud_run_frontend-service_invokers" {
  depends_on = [module.cloud_run_frontend-service]
  source        = "./modules/cloud_run_invoker"
  region        = "europe-west1"
  service_name  = "frontend-service"
  invokers = {
    authentification    = "auth-service@intricate-pad-455413-f7.iam.gserviceaccount.com"
    adminmanagement     = "adminmanagement-service@intricate-pad-455413-f7.iam.gserviceaccount.com"
    wealthmanagement    = "wealthmanagement-service@intricate-pad-455413-f7.iam.gserviceaccount.com"
    notification        = "notification-service@intricate-pad-455413-f7.iam.gserviceaccount.com"
    dashboardmanagement = "dashboardmanagement-service@intricate-pad-455413-f7.iam.gserviceaccount.com"
    chats               = "chats-service@intricate-pad-455413-f7.iam.gserviceaccount.com"
    documentmanagement  = "documentmanagement-service@intricate-pad-455413-f7.iam.gserviceaccount.com"
    calendarmanagement  = "calendarmanagement-service@intricate-pad-455413-f7.iam.gserviceaccount.com"
    housingallocation   = "housingallocation-service@intricate-pad-455413-f7.iam.gserviceaccount.com"
    profilemanagement   = "profilemanagement-service@intricate-pad-455413-f7.iam.gserviceaccount.com"
  }
}