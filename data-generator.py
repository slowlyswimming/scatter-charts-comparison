import pandas as pd
import numpy as np

df = pd.DataFrame(np.random.randint(0,500,size=(250000, 2)), columns=list('xy'))
df.to_csv('./data.csv',index=False)