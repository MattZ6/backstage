import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { EnumStatusCode } from '@shared/errors/AppError';

import ListMusicStylesService from '@modules/music_styles/services/ListMusicStylesService';
import CreateMusicStyleService from '@modules/music_styles/services/CreateMusicStyleService';
import UpdateMusicStyleService from '@modules/music_styles/services/UpdateMusicStyleService';

type IIndexRequestQuery = {
  order_by: 'name' | 'created_at';
  order: 'ASC' | 'DESC';
};

interface ICreateRequest {
  name: string;
}

interface IUpdateRequest {
  name: string;
}

export default class MusicStyleController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { order, order_by } = request.query as IIndexRequestQuery;

    const listMusicStyles = container.resolve(ListMusicStylesService);

    const instruments = await listMusicStyles.execute({
      field: order_by,
      order,
    });

    return response.json(instruments);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body as ICreateRequest;

    const createMusicStyle = container.resolve(CreateMusicStyleService);

    const instrument = await createMusicStyle.execute({ name });

    return response.status(EnumStatusCode.Created).json(instrument);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body as IUpdateRequest;
    const { id: music_style_id } = request.params;

    const updateMusicStyle = container.resolve(UpdateMusicStyleService);

    const instrument = await updateMusicStyle.execute({
      music_style_id,
      name,
    });

    return response.json(instrument);
  }
}
