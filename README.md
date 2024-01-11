# Demo M3ters

A simple webpage to demonstrate them [m3ters.js](https://github.com/ichristwin/m3ters.js) project.

## Table of Contents
- [Features](#features)
- [Key Technologies](#key-technologies)
- [License](#license)


## Features
- Automatic generation of avatars patterns and alias using m3ters.js.
- User-controlled seed generation with start/pause button.
- Audio playback of "The Magic Bomb (Extended Mix)" from YouTube, 
- synchronized with seed generation.


## API Documentation

### M3ter Head SVG API
This project includes a flexible API for generating SVG images based on user input. The SVG generation API supports both query parameters and path parameters, providing flexibility for different use cases.

#### Endpoint
> **GET** /api/m3ter-head

#### Parameters
1. **Using Query Parameters:**
This endpoint generates an SVG based on the provided seed.
    > **GET** /api/m3ter-head?seed=device_DID_string

2. **Using Path Parameters:**
This alternative endpoint also generates an SVG based on the provided seed.
    > **GET** /api/m3ter-head/device_DID_string


## Key Technologies

- React
- Next.js
- m3ters.js
- ReactPlayer

## License

[MIT](./LICENSE)
