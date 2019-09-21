const DocumentCollection = require('../lib/document-collection');
const path = require('path');

jest.mock('../lib/files.js', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  readdir: jest.fn(),
}));


// for setting up mock expectations
const { readFile, writeFile, readdir } = require('../lib/files');

describe('Document Collection', () => {
  // TODO
  it('Saves object to file', () => {
    const sample = {
      key: 'value',
      sick: true
    };

    const writePromise = Promise.resolve(sample);
    writeFile.mockReturnValueOnce(writePromise);

    const dir = 'documents';
    const docs = new DocumentCollection(dir);

    return docs.save(sample)
      .then(object => {
        expect(path.dirname(writeFile.mock.calls[0][0])).toBe(dir);
        expect(writeFile.mock.calls[0][1]).toBe(JSON.stringify(sample));
        expect(object._id).toEqual(expect.any(String));
      });
  });

  it('read object file', () => {
    const sample = {
      key: 'value',
      sick: true,
      _id: 'banana'
    };

    const readPromise = Promise.resolve(JSON.stringify(sample));
    readFile.mockReturnValueOnce(readPromise);

    const dir = 'documents';
    const documents = new DocumentCollection(dir);

    const id = sample._id;

    return documents.get(id)
      .then(object => {
        expect(readFile.mock.calls[0][0]).toBe(`${dir}/${id}.json`);
        expect(object._id).toBe('banana');
      });
  });

  it('read all objects from directory', () => {
    const sample = {
      key: 'value',
      sick: true,
      _id: 'banana'
    };

    const readDirPromise = Promise.resolve(['banana.json']);
    readdir.mockReturnValueOnce(readDirPromise);

    const readPromise = Promise.resolve(JSON.stringify(sample));
    readFile.mockReturnValueOnce(readPromise);

    const dir = 'documents';
    const documents = new DocumentCollection(dir);

    return documents.getAll()
      .then(array => {
        expect(readdir.mock.calls[0][0]).toBe(dir);
        expect(readFile.mock.calls[0][0]).toBe(`${dir}/${sample._id}.json`);
        expect(array[0]._id).toBe(sample._id);
      });
  });
});
