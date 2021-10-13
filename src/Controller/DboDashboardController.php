<?php

namespace Drupal\dbo_dashboard\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Class DboDashboardController.
 */
class DboDashboardController extends ControllerBase {

  /**
   * Dashboard controller page.
   *
   * @return string
   *   Return Build string.
   */
  public function build() {

    \Drupal::service('page_cache_kill_switch')->trigger();
    $build['content'] = [
      // '#theme' => 'dbo_dashboard',
      '#title' => 'Management Information Dashboard',
      '#markup' => '
        <div id="app-vue-midashboard-kbstats-popular"></div>
        <div id="app-vue-midashboard-kbstats-hitsbyrole"></div>
        <div id="app-vue-midashboard-kbstats-failedsearches"></div>
        <div id="app-vue-midashboard-kbstats-searchterms"></div>
        <div id="app-vue-midashboard-kbstats-online"></div>
        <div id="app-vue-midashboard-kbstats-active"></div>
        <div id="app-vue-midashboard-kbstats-version"></div>
      ',
      '#cache' => ['max-age' => 0,],
      '#attached' => [
        'library' => [
          'dbo_dashboard/vue_css',
          'dbo_dashboard/vue_js',
        ],
      ],
    ];

    return $build;

  }

}
