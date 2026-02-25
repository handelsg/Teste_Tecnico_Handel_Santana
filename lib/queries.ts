import { gql } from "@apollo/client";

export const LAUNCH_FIELDS = gql`
  fragment LaunchFields on Launch {
    id
    mission_name
    launch_date_utc
    launch_date_local
    launch_success
    upcoming
    details
    links {
      mission_patch
      mission_patch_small
      article_link
      wikipedia
      video_link
      flickr_images
    }
    rocket {
      rocket_name
      rocket_type
      rocket {
        name
        description
        wikipedia
        first_flight
        country
        company
      }
    }
    launch_site {
      site_id
      site_name
      site_name_long
    }
  }
`;

export const GET_LAUNCHES = gql`
  ${LAUNCH_FIELDS}
  query GetLaunches($limit: Int!, $offset: Int!) {
    launches(limit: $limit, offset: $offset, sort: "launch_date_utc", order: "desc") {
      ...LaunchFields
    }
  }
`;

export const GET_LAUNCH = gql`
  ${LAUNCH_FIELDS}
  query GetLaunch($id: ID!) {
    launch(id: $id) {
      ...LaunchFields
    }
  }
`;

export const GET_LATEST_LAUNCHES = gql`
  ${LAUNCH_FIELDS}
  query GetLatestLaunches {
    launches(limit: 6, sort: "launch_date_utc", order: "desc") {
      ...LaunchFields
    }
    launchNext {
      ...LaunchFields
    }
  }
`;
