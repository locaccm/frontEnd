resource "google_cloud_run_service_iam_member" "invokers" {
  for_each = var.invokers

  location = var.region
  service  = var.service_name
  role     = "roles/run.invoker"
  member = startswith(each.value, "allUsers") || startswith(each.value, "allAuthenticatedUsers")
    ? each.value
    : "serviceAccount:${each.value}"
}
