# Slack Notifier for Cloudwatch Alarms

This is a simple lambda which is designed to be a consumer of an SNS topic which is fired off the
back of a cloudwatch alarm.

I designed this to be when a load balancer reports a 5XX response but it can be tweaked for other
use-cases.

## Usage

1. Update the lambda code with your Slack endpoint URL
1. Deploy the lambda using serverless deploy.
1. Wire up the SNS topic subcriptions to include your lambda.

Done!

You can test-fire the lambda using the test event to make sure it's working and posting to your
Slack workspace using the example event below.

## Example

A SNS alert comes in to the lambda in the `event` argument in the form of:
```json
{
  "Records": [
    {
      "EventSource": "aws:sns",
      "EventVersion": "1.0",
      "EventSubscriptionArn": "arn:aws:sns:<REGION>:<ACCOUNT_NUMBER>:<TOPIC>:<TOPIC_ID>",
      "Sns": {
        "Type": "Notification",
        "MessageId": "<MESSAGE_ID>",
        "TopicArn": "arn:aws:sns:<REGION>:<ACCOUNT_NUMBER>:<TOPIC>",
        "Subject": "ALARM: <YOUR_ALARM>",
        "Message": "{
          \"AlarmName\":\"<ALARM_NAME>\",
          \"AlarmDescription\":\"<CLOUDWATCH_ALARM_DESCRIPTION>\",
          \"AWSAccountId\":\"<ACCOUNT_NUMBER>\",
          ...etc
        }",
        "Timestamp": "2019-10-04T02:02:37.830Z",
      }
    }
  ]
}
```
