const text = `Привет! Я маскот Tama-pets, меня зовут Тама-Тама. Интересно ли вам узнать немного подробнее про данную игру? Тогда посетите раздел 'Об игре'. 
А чтобы сразу перейти к созданию питомца нажмите на кнопку, которую я сейчас создам.
`;

export const GET = async () => {
  const encoder = new TextEncoder();
  let isClosed = false;
  
  const readableStream = new ReadableStream({
    start(controller) {
      let index = 0;

      const sendText = () => {
        if (isClosed) return;
        if (index < text.length) {
          controller.enqueue(encoder.encode(`data: ${text[index++]}\n\n`));
          setTimeout(sendText, 30);
        } else {
          isClosed = true;
          controller.enqueue(encoder.encode(`event: end\ndata: finished\n\n`));
          controller.close();
        }
      };

      sendText();
    },
    cancel() {
      isClosed = true;
    },
  });

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
};

export const POST = async () => {
  const encoder = new TextEncoder();

  return new Response(encoder.encode(text), {
    headers: {
      'Content-Type': 'text/plain'
    }
  });
};
