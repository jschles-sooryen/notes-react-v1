/* eslint-disable import/prefer-default-export */
import { Handler } from '@netlify/functions';
import Note from '../../models/Note';
import connectToDatabaseViaLamba from '../../util/connectToDatabaseViaLamba';

const handler: Handler = async (event) => {
  try {
    await connectToDatabaseViaLamba();
    const { httpMethod, queryStringParameters, body } = event;
    const reqBody = body as any;
    const params = queryStringParameters as any;

    switch (httpMethod) {
      case 'GET':
        try {
          const result = await Note.find({ folder: params.id });
          return {
            statusCode: 200,
            body: JSON.stringify({
              message: 'success',
              data: result,
            }),
          };
        } catch (e: any) {
          return {
            statusCode: 400,
            body: JSON.stringify({
              error: e.message,
            }),
          };
        }
      case 'POST':
        try {
          const data = {
            name: reqBody.name,
            description: reqBody.description,
            folder: params.id,
          };
          const result = await new Note(data);
          await result.save();
          return {
            statusCode: 200,
            body: JSON.stringify({
              message: 'success',
              data: result,
              id: result._id,
            }),
          };
        } catch (e: any) {
          return {
            statusCode: 400,
            body: JSON.stringify({
              error: e.message,
            }),
          };
        }
      case 'PATCH':
        try {
          const data = {
            name: reqBody.name,
            description: reqBody.description,
          };

          await Note.findOneAndUpdate(
            { folder: params.id },
            data,
            { new: true },
          );

          return {
            statusCode: 200,
            body: JSON.stringify({
              message: 'success',
              data,
            }),
          };
        } catch (e: any) {
          return {
            statusCode: 400,
            body: JSON.stringify({
              error: e.message,
            }),
          };
        }
      case 'DELETE':
        try {
          await Note.findByIdAndDelete(params.noteId);
          return {
            statusCode: 200,
            body: JSON.stringify({
              message: 'deleted',
            }),
          };
        } catch (e: any) {
          return {
            statusCode: 400,
            body: JSON.stringify({
              error: e.message,
            }),
          };
        }
      default:
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Restricted HTTP Method' }),
        };
    }
  } catch (e) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: `Error: ${e}` }),
    };
  }
};

export { handler };
