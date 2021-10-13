#!/usr/bin/env bash

HTML_PATH=${HTML_PATH:="/var/www/html"}
DRUSH_BIN=drush
API_TOKEN=$(${DRUSH_BIN} dbo:jwt-generate-mi-dashboard-token)
MODULE_PATH="${HTML_PATH}/web/modules/custom/dbo_dashboard"
APP_JS=$(ls ${MODULE_PATH}/source/dist/js/app.*.js)

if [[ ! -z "$API_TOKEN" ]]
then
  (\
    sed -e ':a' -e 'N' -e '$!ba' -e 's/\n/|||||/g' ${APP_JS} | \
    sed -r "s/baseURL:\"[^\"]*\"/baseURL:\"http:\/\/${HOSTNAME}\"/" | \
    sed -r "s/Authorization:\"Bearer\s+\"\.concat\(\"[^\"]*\"\)/Authorization:\"Bearer \".concat(\"${API_TOKEN}\")/" | \
    sed -r 's/\|\|\|\|\|/\n/g' \
  ) > ${APP_JS}.temp
  mv ${APP_JS}.temp ${APP_JS}

  sudo chown apache:apache ${APP_JS}
fi
