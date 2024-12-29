# Config Schema

## ConfigArtists

_Object record with dynamic keys:_

- _keys of type_ `string`
- _values of type_ _Object with properties:_<ul><li>`name`: `string`</li><li>`location`: `string`</li><li>`description`: `string`</li><li>`infoUrl`: `string` (_url_)</li><li>`image`: _Object with properties:_<ul><li>`src`: `string`</li><li>`width`: `number`</li><li>`height`: `number`</li><li>`format`: `string`</li></ul></li></ul>

## ConfigDays

_Object record with dynamic keys:_

- _keys of type_ `string`
- _values of type_ _Object with properties:_<ul><li>`startTime`: `string`</li><li>`scheduleIncrement`: `number` (_nullable_) _or_ `string` (_regex: `/^\d+$/`_) (_nullable_)</li><li>`location`: `string`</li><li>`mapUrl`: `string` (_url_)</li><li>`mapImage`: _Object with properties:_<ul><li>`src`: `string`</li><li>`width`: `number`</li><li>`height`: `number`</li><li>`format`: `string`</li></ul></li><li>`mapLocations`: `Array<_Tuple:_<ol><li>string</li><li>number (_nullable_)</li><li>number (_nullable_)</li></ol>>`</li><li>`stages`: `Array<string>`</li><li>`schedule`: `Array<Array<string>>`</li><li>`unscheduledArtists`: `Array<string>`</li></ul>

## ConfigOptions

_Object containing the following properties:_

| Property    | Type                                                                                                                                       |
| :---------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `logoImage` | _Object with properties:_<ul><li>`src`: `string`</li><li>`width`: `number`</li><li>`height`: `number`</li><li>`format`: `string`</li></ul> |
| `text`      | _Object with properties:_<ul><li>`artist`: `string`</li><li>`artists`: `string`</li><li>`stages`: `string`</li></ul>                       |

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

## ConfigStages

_Object record with dynamic keys:_

- _keys of type_ `string`
- _values of type_ _Object with properties:_<ul><li>`name`: `string`</li><li>`mapUrl`: `string` (_url_)</li></ul>

## Options

_Object containing the following properties:_

| Property        | Type                                                                                                                                       |
| :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `logoImage`     | _Object with properties:_<ul><li>`src`: `string`</li><li>`width`: `number`</li><li>`height`: `number`</li><li>`format`: `string`</li></ul> |
| **`text`** (\*) | _Object with properties:_<ul><li>`artist`: `string`</li><li>`artists`: `string`</li><li>`stages`: `string`</li></ul>                       |

_(\*) Required._
