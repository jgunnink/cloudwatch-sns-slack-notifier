import fetch from "node-fetch";

type EventHandler<Input, Output> = (event: Input) => Promise<Output>;

interface CloudWatchInput {
  Records: Record[];
}

type Record = {
  Sns: SNS;
};

type SNS = {
  Subject: string;
  Message: string;
  Timestamp: string;
};

export const handler: EventHandler<CloudWatchInput, any> = async event => {
  const subject = event.Records[0].Sns.Subject;
  const message = JSON.parse(event.Records[0].Sns.Message);
  const timestamp = event.Records[0].Sns.Timestamp;

  const slackMessage = `
A cloudwatch alarm has been triggered.\n
Subject is: ${subject}\n
Message: ${message.AlarmDescription}\n
Timestamp: ${timestamp}`;
  const body = JSON.stringify({
    text: slackMessage,
  });

  try {
    await fetch("SLACK_ENDPOINT_URL", {
      method: "post",
      body: body,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body).toString(),
      },
    });
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error("ERROR", error.message, JSON.stringify(error));
    throw error; // to return the error to the consumer
  }
};
