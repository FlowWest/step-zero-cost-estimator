import { graphql } from 'gatsby';
export const WaterSystemDetailsCsvFragment: any = graphql`
  fragment WaterSystemDetailsCsvFragment on WaterSystemDetailsCsv {
    j_sys_pwsid
    j_sys_name
    j_pop
    j_conn
    j_county
    j_class_new
    r_sys_pwsid
    r_sys_name
    r_type
    r_county
    route_name
    distance_feet
    merge_type
    elevation_j
    elevation_r
    route_elev_min
    route_elev_max
    route_elev_mean
    route_elev_range
  }
`;
