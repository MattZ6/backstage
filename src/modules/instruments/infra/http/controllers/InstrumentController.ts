import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EnumStatusCode } from '@shared/errors/AppError';

import ListInstrumentsService from '@modules/instruments/services/ListInstrumentsService';
import CreateInstrumentService from '@modules/instruments/services/CreateInstrumentService';
import UpdateInstrumentService from '@modules/instruments/services/UpdateInstrumentService';

type IIndexRequestQuery = {
  order_by: 'name' | 'label' | 'created_at';
  order: 'ASC' | 'DESC';
};

interface ICreateRequest {
  name: string;
  label: string;
}

interface IUpdateRequest {
  name: string;
  label: string;
}

export default class InstrumentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { order, order_by } = request.query as IIndexRequestQuery;

    const listInstruments = container.resolve(ListInstrumentsService);

    const instruments = await listInstruments.execute({
      field: order_by,
      order,
    });

    return response.json(instruments);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, label } = request.body as ICreateRequest;

    const createInstrument = container.resolve(CreateInstrumentService);

    const instrument = await createInstrument.execute({ name, label });

    return response.status(EnumStatusCode.Created).json(instrument);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, label } = request.body as IUpdateRequest;
    const { id: instrument_id } = request.params;

    const updateInstrument = container.resolve(UpdateInstrumentService);

    const instrument = await updateInstrument.execute({
      instrument_id,
      name,
      label,
    });

    return response.json(instrument);
  }
}
