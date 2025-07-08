import pandas as pd

df = pd.read_csv('real_world_destinations.csv')
df['city_clean'] = df['city_name'].apply(lambda x: x.split('#')[0].strip())
unique_cities = sorted(df['city_clean'].unique())
print(unique_cities)