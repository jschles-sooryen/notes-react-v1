/* eslint-disable import/prefer-default-export */
import { Handler } from '@netlify/functions';
import Folder from '../../models/Folder';
import connectToDatabaseViaLamba from '../../util/connectToDatabaseViaLamba';

const handler: Handler = async (event) => {
  let response: any;
  try {
    const connection = await connectToDatabaseViaLamba();
    const { httpMethod, queryStringParameters, body } = event;
    const reqBody = body as any;
    const params = queryStringParameters as any;

    switch (httpMethod) {
      case 'GET':
        try {
          const result = await Folder.find({});
          response = {
            statusCode: 200,
            body: JSON.stringify({
              message: 'success',
              data: result,
            }),
          };
        } catch (e: any) {
          response = {
            statusCode: 400,
            body: JSON.stringify({
              error: e.message,
            }),
          };
        }
        break;
      case 'POST':
        try {
          const result = await new Folder({ name: reqBody.name });
          await result.save();
          response = {
            statusCode: 200,
            body: JSON.stringify({
              message: 'success',
              data: result,
              id: result._id,
            }),
          };
        } catch (e: any) {
          response = {
            statusCode: 400,
            body: JSON.stringify({
              error: e.message,
            }),
          };
        }
        break;
      case 'PATCH':
        try {
          const data = {
            name: reqBody.name,
          };
          const result = await Folder.findByIdAndUpdate(params.id, data, { new: true });
          response = {
            statusCode: 200,
            body: JSON.stringify({
              message: 'success',
              data: result,
              id: result._id,
            }),
          };
        } catch (e: any) {
          response = {
            statusCode: 400,
            body: JSON.stringify({
              error: e.message,
            }),
          };
        }
        break;
      case 'DELETE':
        try {
          await Folder.findByIdAndDelete(params.id);
          response = {
            statusCode: 200,
            body: JSON.stringify({
              message: 'deleted',
            }),
          };
        } catch (e: any) {
          response = {
            statusCode: 400,
            body: JSON.stringify({
              error: e.message,
            }),
          };
        }
        break;
      default:
        response = {
          statusCode: 404,
          body: JSON.stringify({ message: 'Restricted HTTP Method' }),
        };
    }
    connection.close();
  } catch (e) {
    connection.close();
    response = {
      statusCode: 404,
      body: JSON.stringify({ message: `Error: ${e}` }),
    };
  }

  return response;
};

export { handler };
