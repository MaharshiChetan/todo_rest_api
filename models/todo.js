'use strict';
export default (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    'Todo',
    {
      title: DataTypes.STRING,
      allowNull: false
    },
    {}
  );
  Todo.associate = function(models) {
    // associations can be defined here
    Todo.hasMany(models.TodoItem, {
      foreignKey: 'todoId'
    });
  };
  return Todo;
};