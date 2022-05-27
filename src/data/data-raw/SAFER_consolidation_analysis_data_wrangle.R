# Using Consolidation Analysis.xlsx (attached in Files section) extract water system data as csv from the 
# "RESULTS_Consolidations" sheet
# Return all columns
# basic QC

library(readxl)
library(tidyverse)

consolidations <- read_excel('2_Consolidation Analysis_FINAL.xlsx', sheet = 'RESULTS_Consolidations') %>% 
  janitor::remove_empty() %>%
  janitor::clean_names() %>%
  glimpse()

janitor::get_dupes(consolidations)

user_inputs <- read_excel('consolidation_cost_methodology.xlsx', range = 'A3:S3') %>% janitor::clean_names() %>% glimpse()
user_inputs <- names(user_inputs)

all_vars <- c(user_inputs)

consolidations <- consolidations %>%
  select(all_vars) %>%
  rename(j_sys_pwsid_old = j_sys_pwsid,
         j_pop_old = j_pop, 
         j_conn_old = j_conn)

new <- read_excel('WS.Detail.xlsx', skip = 3) %>% janitor::clean_names() %>% 
  select('number', 'population', 'svc_connect_total')

consolidations_final <- merge(new, consolidations, by.x = 'number', by.y = "j_sys_pwsid_old") %>%
  rename(j_sys_pwsid = number,
         j_pop = population,
         j_conn = svc_connect_total) %>%
  select(-j_pop_old, -j_conn_old)

#write.csv(consolidations_final, '../water_system_details.csv')


# TODO: will need to update to fill in NAs for PWSIDs when data becomes available 

# Quick data exploration -------------------------------------------------------
summary(consolidations)

# N Nas
consolidations %>% filter(is.na(j_sys_pwsid)) %>% glimpse()

# distance_miles
hist(consolidations$distance_miles)
table(consolidations$distance_miles) # distance_miles remains constant throughout. Is this correct?


hist(consolidations$distance_feet)

# pipeline_cost
hist(consolidations$pipeline_cost)
ggplot() +
  geom_line(data = consolidations, aes(x = distance_feet, y = pipeline_cost)) #1:1 relationship makes sense 

# county
table(consolidations$j_county)
length(unique(consolidations$j_county))





