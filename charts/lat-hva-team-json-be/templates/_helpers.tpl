{{/*
Expand the name of the chart.
*/}}
{{- define "lat-hva-team-json-be.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "lat-hva-team-json-be.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "lat-hva-team-json-be.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}


{{/*
Common labels
*/}}
{{- define "lat-hva-team-json-be.labels" -}}
helm.sh/chart: {{ include "lat-hva-team-json-be.chart" . }}
{{ include "lat-hva-team-json-be.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "lat-hva-team-json-be.selectorLabels" -}}
app.kubernetes.io/name: {{ include "lat-hva-team-json-be.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "lat-hva-team-json-be.serviceAccountName" -}}
{{- if .Values.serviceAccount.create }}
{{- default (include "lat-hva-team-json-be.fullname" .) .Values.serviceAccount.name }}
{{- else }}
{{- default "default" .Values.serviceAccount.name }}
{{- end }}
{{- end }}


{{- define "postgresql.fullname" -}}
{{ printf "%s-%s" .Release.Name "postgresql" | trunc 63 | trimSuffix "-" }}
{{- end -}}

{{- define "postgresql.port" -}}
{{-  "5432" -}}
{{- end -}}

{{- define "pospostgresql.database" -}}
  {{- .Values.postgresql.auth.database | quote -}}
{{- end -}}

{{- define "pospostgresql.user" -}}
  {{- .Values.postgresql.auth.username | quote -}}
{{- end -}}

{{- define "postgresql.secretName" -}}
{{ include "postgresql.fullname" . }}
{{- end -}}

{{ define "postgresql.passwordKey" }}
{{- "password" -}}
{{- end -}}
