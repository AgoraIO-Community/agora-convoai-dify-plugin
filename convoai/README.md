## Agora Conversational AI

**Author:** plutoless
**Version:** 0.0.1
**Type:** extension

### Description

#### Overview

This extension provides an endpoint to make Dify agents work with Agora Conversational AI. You can easily turn your Dify agents into voice assistant by using this extension.

#### Configuration

- **APP**
    The Dify App to turn into voice assistant, choose one from your agent library.
- **Agora App ID**
    The Agora App ID to use for RTC service. Get it from [Agora Console](https://console.agora.io/).
- **Agora RESTful Customer ID**
    The Agora RESTful Customer ID to use for RTC service. Get it from [Agora Console](https://console.agora.io/).
- **Agora RESTful Customer Secret**
    The Agora RESTful Customer Secret to use for RTC service. Get it from [Agora Console](https://console.agora.io/).
- **TTS Vendor**
    The TTS vendor to use for voice synthesis. Choose one from the list below.
  - **Azure**
- **TTS Vendor Params**
    The parameters for the TTS vendor. The parameters are different for each vendor, please refer to the vendor's documentation for more information.
  - **Azure**

    ```json
    {
        "key": "<your api key>",
        "region": "eastasia",
        "voice_name": "en-US-AndrewMultilingualNeural"
    }
    ```

- **Greeting Message**
    The message to greet the user when the conversation starts.
- **Failure Message**
    The message to tell the user when the conversation fails.
- **Agora App Certificate**
    The Agora App Certificate to use for RTC service. Get it from [Agora Console](https://console.agora.io/). Only needed when security token is enabled for your Agora project.
- **API Key**
    The API Key to protect your Dify endpoint.

#### Usage

Once you finish the configuration, in the endpoint you may find the api endpoint like following:

`https://daemon-plugin.dify.dev/3VYwP********12/convoai-web/<file>`

Replace `<file>` with `index.html`,

Then you may navigate to following url to access the integrated Conversational AI web page.

`https://daemon-plugin.dify.dev/3VYwP********12/convoai-web/index.html`