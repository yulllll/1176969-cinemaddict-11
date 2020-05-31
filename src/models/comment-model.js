export default class CommentModel {
  constructor(data) {
    this.id = data.id;
    this.comment = data.comment;
    this.emotion = data.emotion;
    this.author = data.author;
    this.date = data.date;
  }

  toRAW() {
    return {
      "comment": this.comment,
      "date": this.date,
      "emotion": this.emotion,
    };
  }

  static parseComment(data) {
    return new CommentModel(data);
  }

  static parseComments(data) {
    return data.map(CommentModel.parseComment);
  }
}
