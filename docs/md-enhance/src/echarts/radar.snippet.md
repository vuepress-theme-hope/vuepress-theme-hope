::: echarts A Radar Chart

```json
{
  "legend": {
    "data": ["Allocated Budget", "Actual Spending"]
  },
  "radar": {
    "indicator": [
      { "name": "Sales", "max": 6500 },
      { "name": "Administration", "max": 16000 },
      { "name": "Information Technology", "max": 30000 },
      { "name": "Customer Support", "max": 38000 },
      { "name": "Development", "max": 52000 },
      { "name": "Marketing", "max": 25000 }
    ]
  },
  "series": [
    {
      "name": "Budget vs spending",
      "type": "radar",
      "data": [
        {
          "value": [4200, 3000, 20000, 35000, 50000, 18000],
          "name": "Allocated Budget"
        },
        {
          "value": [5000, 14000, 28000, 26000, 42000, 21000],
          "name": "Actual Spending"
        }
      ]
    }
  ]
}
```

:::
