# Using Consolidation Analysis.xlsx (attached in Files section) extract water system data as csv from the "RESULTS_Consolidations" sheet
# Return all columns
# basic QC

consolidations <- read_excel('2_Consolidation Analysis_FINAL.xlsx', sheet = 'RESULTS_Consolidations') %>% 
  janitor::remove_empty() %>%
  janitor::clean_names() %>%
  glimpse()

janitor::get_dupes(consolidations)

user_inputs <- read_excel('consolidation_cost_methodology.xlsx', range = 'A3:S3') %>% janitor::clean_names() %>% glimpse()
user_inputs <- names(user_inputs)

cost_variables <- read_excel('consolidation_cost_methodology.xlsx', range = 'A8:A14') %>% janitor::clean_names() %>% glimpse()
cost_variables <- unique(cost_variables$variable)

system_calcs <- read_excel('consolidation_cost_methodology.xlsx', range = 'A21:A33') %>% janitor::clean_names() %>% glimpse()
system_calcs <- unique(system_calcs$variable)

all_vars <- c(user_inputs, cost_variables, system_calcs)

consolidations <- consolidations %>%
  select(all_vars)

summary(consolidations)

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





