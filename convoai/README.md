## Agora Conversational AI

**Author:** plutoless
**Version:** 0.0.3
**Type:** extension

### Description

#### Overview

This extension provides an endpoint to make Dify agents work with Agora Conversational AI. You can easily turn your Dify agents into voice assistant by using this extension.

#### Configuration

- **APP**
    The Dify App to turn into voice assistant, choose one from your agent library.
- **Agora App ID**
    The Agora App ID to use for RTC service. Get it from [Agora Console](https://console.agora.io/). Note to enable the Agora Conversational AI service in the Agora Console.
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

#### Using API without Web Page

You can also use the API directly without the web page. The API endpoint is:

##### Start Conversation

API Endpoint: `https://qv90***.ai-plugin.io/convoai-start`

| key | value |
| --- | --- |
| base_url | The base url of the extension |
| channel | The channel id of the extension |

Example cURL:

```bash
curl 'https://qv90***.ai-plugin.io/convoai/convoai-start' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: zh,en;q=0.9,zh-CN;q=0.8' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  --data-raw '{"base_url":"https://qv90***.ai-plugin.io","channel":"jh0y8fgk7"}'
```

##### Stop Conversation

API Endpoint: `https://qv90***.ai-plugin.io/convoai-stop`

| key | value |
| --- | --- |
| agent_id | The agent id of the extension |

Example cURL:

```bash
curl 'https://qv90***.ai-plugin.io/convoai/convoai-stop' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: zh,en;q=0.9,zh-CN;q=0.8' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  --data-raw '{"agent_id":"1NT29X0ZX0JYPJ96CCL8F4Y4VUEGR566"}'
```
