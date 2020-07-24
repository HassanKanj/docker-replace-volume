# Docker replace volume

This command will replace a docker volume in a specific container by another volume, while attaching it to the same directory (Note: current container will stop, and a new container will be added).

## Usage

```console
node replace-volume --container-id='CONTAINER_ID' --old-volume='OLD_VOLUME_NAME' --new-volume='NEW_VOLUME_NAME' --additional-options='ADDITIONAL_OPTIONS_HERE'
```

**Example:**

```console
node replace-volume --container-id='6844ef432085' --old-volume='my_original_volume' --new-volume='backup_2' --additional-options='-p 27017:27017 -e DB_PASSWORD=rtvEZM443##%11UB'
```

**Notes:**

- You don't have to enter the full container id
- **additional-options** is an optional arg
- In case you want to add any additional options to the new container (e.g publishing port(s), setting env variables, etc..), you have to specify them in **--additional-options**, the generated docker run command for the new container will have this format:
```docker run -dit -v ${newVolume}:${attachedDirectory} ${additionalOptions} ${containerImage}```

## License

MIT License

Copyright (c) 2020 Hassan Kanj

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
