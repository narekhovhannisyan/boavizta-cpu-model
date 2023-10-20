# boavizta-cpu-model

[Boavizta](https://boavizta.org/) is an environmental impact calculator that exposes an API we use in IEF to retrieve energy and embodied carbon estimates.

## Implementation

Boavizta exposes a [REST API](https://doc.api.boavizta.org/). If the `boavizta` model is included in an IEF pipeline, IEF sends API requests to Boavizta. The request payload is generated from input data provided to IEF in an `impl` file.

## Usage

To run the `boavista-cpu` model an instance of `BoaviztaCpuImpactModel` must be created and its `configure()` method called. Then, the model's `calculate()` method can be called, passing `duration`,`cpu-util`,`timestamp` arguments.

This is how you could run the model in Typescript:

```typescript
import {BoaviztaCpuImpactModel, KeyValuePair} from '../src';

async function runBoavizta() {
  const params: KeyValuePair = {};
  params.allocation = 'TOTAL';
  params.verbose = true;
  params.name = 'Intel Xeon Platinum 8160 Processor';
  params.core_units = 24;

  const newModel = await new BoaviztaCpuImpactModel().configure('test', params);
  const usage = await newModel.calculate([
    {
      timestamp: '2021-01-01T00:00:00Z',
      duration: '15s',
      cpu-util: 34,
    },
    {
      timestamp: '2021-01-01T00:00:15Z',
      duration: '15s',
      cpu-util: 12,
    },
    {
      timestamp: '2021-01-01T00:00:30Z',
      duration: '15s',
      cpu-util: 1,
    },
    {
      timestamp: '2021-01-01T00:00:45Z',
      duration: '15s',
      cpu-util: 78,
    },
  ]);

  console.log(usage);
}

runBoavizta();
```
