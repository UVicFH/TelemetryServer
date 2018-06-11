const test_insert_docs = async () => {
  write_data([{ a: 1 }, { a: 2 }, { a: 3 }]);
};

setTimeout(() => test_insert_docs(), 2000);
