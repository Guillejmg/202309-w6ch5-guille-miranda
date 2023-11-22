/* Import { Request, Response, NextFunction } from 'express';
import { KnowledgeList } from './controller';
import { SubjetsFileRepo } from '../repos/subjets.file.repo';
import {}

describe('Given TasksController class', () => {
  describe('When we instantiate it', () => {

    let controller =
    let mockRequest=
    let mockResponse=
    BeforeEach(()={

    })

    test('Then getAll should ...', async () => {
      SubjetsFileRepo.prototype.getAll = jest.fn().mockResolvedValue([{}]);

      const controller = new KnowledgeList();

      const mockRequest: Request = {
        body: {},
      } as Request;

      const mockResponse: Response = {
        json: jest.fn(),
      } as unknown as Response;

      await controller.getAll(mockRequest, mockResponse);
      expect(mockResponse.json).toHaveBeenCalledWith([{}]);
    });

    test('Then getById should...', async () => {
      const mockRequest: Request = { params: { id: 1 } } as unknown as Request;
      const mockResponse: Response = { json: jest.fn() } as unknown as Response;
      const next = jest.fn();

      const beerController = new BeerController();
      beerController.repo.getById = jest
        .fn()
        .mockResolvedValue({ id: 1, name: 'Beer' });

      await beerController.getById(mockRequest, mockResponse, next);
      expect(beerController.repo.getById).toHaveBeenCalledWith(1);
      expect(mockResponse.json).toHaveBeenCalledWith({ id: 1, name: 'Beer' });
    });

    test('Then create should...', async () => {
      const beerController = new BeerController();
      const req = {
        body: {},
      } as unknown as Request;
      const res = {
        status: jest.fn().mockReturnThis(),
        statusMessage: '',
        json: jest.fn(),
      } as unknown as Response;
      await beerController.create(req, res);
      expect(res.json).toHaveBeenCalled( expected result );
    });
    test('The should update a beer...', async () => {
      const beerController = new BeerController();
      const req = {
        params: { id: '1' },
        body: { name: 'Updated Beer' },
      } as unknown as Request;
      const res = {
        json: jest.fn(),
      } as unknown as Response;
      beerController.repo.update = jest
        .fn()
        .mockResolvedValue({ id: 1, name: 'Updated Beer' });
      await beerController.update(req, res);
      expect(res.json).toHaveBeenCalledWith({ id: 1, name: 'Updated Beer' });
    });
  Test('Then delete should...', async () => {
    const beerController = new BeerController();
    const req = { params: { id: 1 } } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      statusMessage: '',
    } as unknown as Response;
    const next = jest.fn();
    await beerController.delete(req, res, next);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({});
    expect(next).not.toHaveBeenCalled();
  });
  });
});
*/
