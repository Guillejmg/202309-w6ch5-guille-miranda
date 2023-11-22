import { SubjetsFileRepo } from './subjets.file.repo';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('Given SubjetsFileRepo class', () => {
  describe('When we instantiate it', () => {
    const mockData = '[{"name": "Test"}]';
    fs.readFile = jest.fn().mockResolvedValue(mockData);
    fs.writeFile = jest.fn();
    const repo = new SubjetsFileRepo();

    test('Then getAll should ...', async () => {
      const result = await repo.getAll();
      expect(result).toStrictEqual(JSON.parse(mockData));
    });
  });

  describe('When we instantiate it', () => {
    let repo: SubjetsFileRepo;
    beforeEach(() => {
      repo = new SubjetsFileRepo();
    });

    test('then should retrieve Subjet by ID', async () => {
      const allSubjets = await repo.getAll();
      const subjetToTest = allSubjets[0];
      const result = await repo.getById(subjetToTest.id);
      expect(result).toEqual(subjetToTest);
    });
  
    test('then should throw an error for non-existing ID', async () => {
      const nonExistingId = 'non-existing-id';
      await expect(repo.getById(nonExistingId)).rejects.toThrow('GetById not possible');
    });
  });


  describe('when we create:', () => {
    let repo: SubjetsFileRepo;
  
    beforeEach(() => {
      repo = new SubjetsFileRepo();
    });
  
    test('then it should create a new subjet', async () => {
      const newItem = {
        name: 'New subjet',
        week: 0,
        learned: false,
        image: 'path/to/image.jpg',
      };
  
      const createdSubjects = await repo.create(newItem);
      expect(createdSubjects).toMatchObject(newItem);
      const allSubjects = await repo.getAll();
      expect(allSubjects).toContainEqual(createdSubjects);
    });
  });

  describe('when update', () => {
    let repo: SubjetsFileRepo;
  
    beforeEach(() => {
      repo = new SubjetsFileRepo();
    });
  
    it('should update an existing Subject', async () => {

      const allSubject = await repo.getAll();
      const subjectToUpdate = allSubject[0];
  
      const updatedProperties = {
        name: 'Updated Subject Name',
        week: 1,
        image: 'path/to/updated-image.jpg',
      };
  
      const updatedSubject = await repo.update(subjectToUpdate.id, updatedProperties);
  
      expect(updatedSubject).toMatchObject({
        ...subjectToUpdate, 
        ...updatedProperties,
      });
  
      const updatedSubjectsList = await repo.getAll();
      expect(updatedSubjectsList).toContainEqual(updatedSubject);
      expect(updatedSubjectsList).not.toContainEqual(subjectToUpdate);
    });
  
    it('should throw an error for updating a non-existing hobby', async () => {
      const nonExistingId = 'non-existing-id';
      const updatedProperties = {
        name: 'Updated Subject Name',
        week: 1,
        image: 'path/to/updated-image.jpg',
      }
      await expect(repo.update(nonExistingId, updatedProperties)).rejects.toThrow('Update not possible');
    });
  });
  
  describe('When we delete:', () => {
    let repo: SubjetsFileRepo;
  
    beforeEach(() => {
      repo = new SubjetsFileRepo();
    });
  
    it('should delete an existing subject', async () => {
      const allSubjects = await repo.getAll();
      const subjectToDelete = allSubjects[0];
      await repo.delete(subjectToDelete.id);
      const updatedSubjectsList = await repo.getAll();
      expect(updatedSubjectsList).not.toContainEqual(subjectToDelete);
    });
  
    it('should throw an error for deleting a non-existing subject', async () => {
      const nonExistingId = 'non-existing-id';
      await expect(repo.delete(nonExistingId)).rejects.toThrow('Delete not possible');
    });
  });
  

  });
