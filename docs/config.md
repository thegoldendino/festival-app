# Config Schema

## ConfigArtist

_Object containing the following properties:_

| Property        | Type             |
| :-------------- | :--------------- |
| **`name`** (\*) | `string`         |
| `location`      | `string`         |
| `description`   | `string`         |
| `infoUrl`       | `string` (_url_) |
| `image`         | [Image](#image)  |

_(\*) Required._

## ConfigArtists

_Object record with dynamic keys:_

- _keys of type_ `string`
- _values of type_ [ConfigArtist](#configartist)

## ConfigDay

_Object containing the following properties:_

| Property                     | Type                                                                                              | Default |
| :--------------------------- | :------------------------------------------------------------------------------------------------ | :------ |
| **`startTime`** (\*)         | `string`                                                                                          |         |
| **`scheduleIncrement`** (\*) | `number` (_nullable_) _or_ `string` (_regex: `/^\d+$/`_) (_nullable_)                             |         |
| `location`                   | `string`                                                                                          |         |
| `mapUrl`                     | `string` (_url_)                                                                                  |         |
| `mapImage`                   | [Image](#image)                                                                                   |         |
| `mapLocations`               | `Array<_Tuple:_<ol><li>string</li><li>number (_nullable_)</li><li>number (_nullable_)</li></ol>>` | `[]`    |
| **`stages`** (\*)            | `Array<string>`                                                                                   |         |
| **`schedule`** (\*)          | `Array<Array<string>>`                                                                            |         |
| `unscheduledArtists`         | `Array<string>`                                                                                   |         |

_(\*) Required._

## ConfigDays

_Object record with dynamic keys:_

- _keys of type_ `string`
- _values of type_ [ConfigDay](#configday)

## ConfigOptions

_Object containing the following properties:_

| Property    | Type                                                                                                                 |
| :---------- | :------------------------------------------------------------------------------------------------------------------- |
| `logoImage` | [Image](#image)                                                                                                      |
| `text`      | _Object with properties:_<ul><li>`artist`: `string`</li><li>`artists`: `string`</li><li>`stages`: `string`</li></ul> |

_All properties are optional._

## Config

_Object containing the following properties:_

| Property           | Type                            |
| :----------------- | :------------------------------ |
| **`days`** (\*)    | [ConfigDays](#configdays)       |
| **`stages`** (\*)  | [ConfigStages](#configstages)   |
| **`artists`** (\*) | [ConfigArtists](#configartists) |
| `options`          | [ConfigOptions](#configoptions) |

_(\*) Required._

## ConfigStage

_Object containing the following properties:_

| Property        | Type             |
| :-------------- | :--------------- |
| **`name`** (\*) | `string`         |
| `mapUrl`        | `string` (_url_) |

_(\*) Required._

## ConfigStages

_Object record with dynamic keys:_

- _keys of type_ `string`
- _values of type_ [ConfigStage](#configstage)

## Image

_Object containing the following properties:_

| Property       | Type     |
| :------------- | :------- |
| **`src`** (\*) | `string` |
| `width`        | `number` |
| `height`       | `number` |
| `format`       | `string` |

_(\*) Required._

## Options

_Object containing the following properties:_

| Property        | Type                                                                                                                 |
| :-------------- | :------------------------------------------------------------------------------------------------------------------- |
| `logoImage`     | [Image](#image)                                                                                                      |
| **`text`** (\*) | _Object with properties:_<ul><li>`artist`: `string`</li><li>`artists`: `string`</li><li>`stages`: `string`</li></ul> |

_(\*) Required._
