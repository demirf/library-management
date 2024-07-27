import { Request, Response } from 'express';
import { BaseService } from './base.service';

export class BaseController<T> {
  constructor(private baseService: BaseService<T>) {}

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const entity = await this.baseService.create(req.body);
      res.status(201).json(entity);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const entities = await this.baseService.findAll();
      res.status(200).json(entities);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  findOne = async (req: Request, res: Response): Promise<void> => {
    try {
      const entity = await this.baseService.findOne(Number(req.params.id));
      if (entity) {
        res.status(200).json(entity);
      } else {
        res.status(404).json({ error: 'Entity not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const entity = await this.baseService.update(Number(req.params.id), req.body);
      res.status(200).json(entity);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.baseService.delete(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}
