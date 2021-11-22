/* eslint-disable import/prefer-default-export */
import { Handler } from '@netlify/functions';
import mongoose from 'mongoose';
import Note from '../../models/Note';
import connectToDatabaseViaLamba from '../../util/connectToDatabaseViaLamba';

const handler: Handler = async (event) => {
  let response: any;
  try {
    await connectToDatabaseViaLamba();
    const { httpMethod, queryStringParameters, body } = event;
    let reqBody;
    if (body) {
      reqBody = JSON.parse(body);
    }
    const params = queryStringParameters as any;

    switch (httpMethod) {
      case 'GET':
        try {
          const result = await Note.find({ folder: params.id });
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
          const data = {
            name: reqBody.name,
            description: reqBody.description,
            folder: reqBody.id,
          };
          const result = await new Note(data);
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
            description: reqBody.description,
          };

          await Note.findOneAndUpdate(
            { folder: params.id },
            data,
            { new: true },
          );

          response = {
            statusCode: 200,
            body: JSON.stringify({
              message: 'success',
              data,
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
          await Note.findByIdAndDelete(params.noteId);
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
      case 'OPTIONS':
        response = {
          statusCode: 200,
          body: JSON.stringify({ message: 'Successful preflight call.' }),
        };
        break;
      default:
        response = {
          statusCode: 404,
          body: JSON.stringify({ message: 'Restricted HTTP Method' }),
        };
    }
    mongoose.connection.close();
  } catch (e) {
    mongoose.connection.close();
    response = {
      statusCode: 404,
      body: JSON.stringify({ message: `Error: ${e}` }),
    };
  }

  response.headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  };

  return response;
};

export { handler };
