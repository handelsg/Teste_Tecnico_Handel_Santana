export interface LaunchLinks {
  mission_patch: string | null;
  mission_patch_small: string | null;
  article_link: string | null;
  wikipedia: string | null;
  video_link: string | null;
  flickr_images: string[];
}

export interface RocketDetails {
  name: string;
  description: string;
  wikipedia: string | null;
  first_flight: string | null;
  country: string | null;
  company: string | null;
}

export interface LaunchRocket {
  rocket_name: string;
  rocket_type: string | null;
  rocket: RocketDetails | null;
}

export interface LaunchSite {
  site_id: string | null;
  site_name: string | null;
  site_name_long: string | null;
}

export interface Launch {
  id: string;
  mission_name: string;
  launch_date_utc: string | null;
  launch_date_local: string | null;
  launch_success: boolean | null;
  upcoming: boolean;
  details: string | null;
  links: LaunchLinks;
  rocket: LaunchRocket;
  launch_site: LaunchSite | null;
}

export interface LaunchesResponse {
  launches: Launch[];
}

export interface LaunchResponse {
  launch: Launch;
}
