# Config Schema

## Config

_Object containing the following properties:_

| Property           | Type                                                                                          |
| :----------------- | :-------------------------------------------------------------------------------------------- |
| **`days`** (*)    | _Record with yyyy-mm-dd keys of type_ `string` _and values of type_ [ConfigDay](#configday)   |
| **`stages`** (*)  | _Record with stage keys of type_ `string` _and values of type_ [ConfigStage](#configstage)    |
| **`artists`** (*) | _Record with artist keys of type_ `string` _and values of type_ [ConfigArtist](#configartist) |
| `options`          | [ConfigOptions](#configoptions)                                                               |

_(*) Required._

## ConfigArtist

_Object containing the following properties:_

| Property        | Type             |
| :-------------- | :--------------- |
| **`name`** (*) | `string`         |
| `hometown`      | `string`         |
| `description`   | `string`         |
| `infoUrl`       | `string` (_url_) |
| `image`         | [Image](#image)  |

_(*) Required._

## ConfigDay

_Object containing the following properties:_

| Property                     | Type                                                   | Default |
| :--------------------------- | :----------------------------------------------------- | :------ |
| **`startTime`** (*)         | `string` (_time format_)                               |         |
| **`scheduleIncrement`** (*) | `number` _or_ `string` (_regex: `/^\d+$/`_)            |         |
| `display`                    | `string`                                               |         |
| `locations`                  | `Array<[string, string]>` _(key, "lat,lng" pairs)_     | `[]`    |
| **`stages`** (*)            | `Array<string>`                                        |         |
| **`schedule`** (*)          | `Array<Array<string>>`                                 |         |
| `unscheduledArtists`         | `Array<string>`                                        |         |

_(*) Required._

### Notes on ConfigDay

- The `schedule` field must have the same number of entries per timeslot as there are stage names in the `stages` array.
- Each entry in `locations` is a tuple where:
  - First element is a key that must correspond to a stage key or a predefined location type
  - Second element is a string in "lat,lng" format with valid latitude and longitude values

## ConfigOptions

_Object containing the following properties:_

| Property               | Type                                                                                                                 |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------- |
| `logoImage`            | [Image](#image)                                                                                                      |
| `logoHref`             | `string` (_url_)                                                                                                     |
| `responsivefullscreen` | `boolean`                                                                                                            |
| `text`                 | _Object with properties:_<ul><li>`artist`: `string`</li><li>`artists`: `string`</li><li>`stages`: `string`</li></ul> |

_All properties are optional._

## ConfigStage

_Object containing the following properties:_

| Property        | Type                 |
| :-------------- | :------------------- |
| **`name`** (*) | `string`             |
| **`location`** (*) | `string` (_lat,lng format_) |

_(*) Required._

### Notes on ConfigStage
- The `location` field must be a valid "lat,lng" string representing the geographical coordinates of the stage.

## Image

_Object containing the following properties:_

| Property       | Type     |
| :------------- | :------- |
| **`src`** (*) | `string` |
| `width`        | `number` |
| `height`       | `number` |
| `format`       | `string` |

_(*) Required._

## Options

_Internal schema used after processing ConfigOptions. Includes these properties:_

| Property            | Type                                                                                                                 |
| :----------------- | :------------------------------------------------------------------------------------------------------------------- |
| `logoImage`         | [Image](#image)                                                                                                      |
| `responsivefullscreen` | `boolean`                                                                                                         |
| **`text`** (*)     | _Object with properties:_<ul><li>`artist`: `string`</li><li>`artists`: `string`</li><li>`stages`: `string`</li></ul> |

_(*) Required._