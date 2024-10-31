// old typings before they were removed
export interface Root {
  project1: Project1;
  project2: Project2;
  ts: number;
  signature: string;
}

export interface Project1 {
  id: string;
  identifier: string;
  readme_url: string;
  autonumber: number;
  matchups: string[];
  wins: string[];
  losses: string[];
  entrant: string[];
  repo_url: string;
  rating: number;
  title: string;
  deploy_url: string;
  win_adjustments: number;
  loss_adjustments: number;
  screenshot_url: string;
  hours: number;
  contest: string[];
  matchups_count: number;
  contest__min_multiplier: number[];
  contest__max_multiplier: number[];
  contest__min_rating: number[];
  contest__max_rating: number[];
  rating_percentile: number;
  quality_multiplier: number;
  dollar_valuation: number;
  contest__dollars_per_mean_hour: number[];
  contest__doubloons_per_dollar: number[];
  doubloon_valuation: number;
  entrant__slack_id: string[];
  wins_count: number;
  losses_count: number;
  victory_balance: number;
  dollars_per_hour: number;
  project_source: string;
  ship_status: string;
  ship_type: string;
  vote_requirement: number;
  created_time: string;
  entrant__vote_balance: number[];
  vote_balance_exceeds_requirement: boolean;
  record_id: string;
  ship_time: string;
  aggregated_discordance: string;
  aggregated_adjustment_magnitudes: string;
  aggregated_loss_adjustment: string;
  aggregated_win_adjustments: string;
  total_hours: number;
  credited_hours: number;
  ship_status_modified_at: string;
  doubloon_payout_modified_at: string;
  entrant__record_id: string[];
  baseline_doubloon_valuation: number;
  baseline_dollar_valuation: number;
  baseline_doubloon_payout: number;
  bonus_doubloon_payout: number;
  "ship_status_modified_at copy": string;
  title_with_update_count: string;
}

export interface Project2 {
  id: string;
  identifier: string;
  readme_url: string;
  autonumber: number;
  matchups: string[];
  wins: string[];
  losses: string[];
  entrant: string[];
  repo_url: string;
  rating: number;
  title: string;
  deploy_url: string;
  win_adjustments: number;
  loss_adjustments: number;
  screenshot_url: string;
  hours: number;
  contest: string[];
  matchups_count: number;
  contest__min_multiplier: number[];
  contest__max_multiplier: number[];
  contest__min_rating: number[];
  contest__max_rating: number[];
  rating_percentile: number;
  quality_multiplier: number;
  dollar_valuation: number;
  contest__dollars_per_mean_hour: number[];
  contest__doubloons_per_dollar: number[];
  doubloon_valuation: number;
  doubloon_payout: number;
  vote_requirement_met: boolean;
  entrant__slack_id: string[];
  wins_count: number;
  losses_count: number;
  victory_balance: number;
  dollars_per_hour: number;
  project_source: string;
  ship_status: string;
  ship_type: string;
  vote_requirement: number;
  created_time: string;
  entrant__vote_balance: number[];
  record_id: string;
  ship_time: string;
  wakatime_project_name: string;
  aggregated_discordance: string;
  aggregated_adjustment_magnitudes: string;
  aggregated_loss_adjustment: string;
  aggregated_win_adjustments: string;
  total_hours: number;
  credited_hours: number;
  ship_status_modified_at: string;
  doubloon_payout_modified_at: string;
  ysws_submission: string[];
  entrant__record_id: string[];
  for_ysws: string;
  baseline_doubloon_valuation: number;
  baseline_dollar_valuation: number;
  baseline_doubloon_payout: number;
  bonus_doubloon_payout: number;
  "ship_status_modified_at copy": string;
  paid_out: boolean;
  title_with_update_count: string;
}
