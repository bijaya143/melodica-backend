function SchemaWithBaseTime(schema) {
  return {
    ...schema,
    createdAt: { type: Date },
    updatedAt: { type: Date },
  };
}

async function preSaveAddBaseTime(next) {
  const now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
}

module.exports = {
  SchemaWithBaseTime,
  preSaveAddBaseTime,
};
