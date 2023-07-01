permit (
    principal,
    action in [IbarakiSampleStore::Action::"GET"],
    resource == IbarakiSampleStore::ApiEndPoint::"hello"
)
when { ["hello"].contains(principal.custom.role) };