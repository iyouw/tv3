export class FileType {
    static Org = new FileType('机构库',-2);
    static Folder = new FileType('文件夹', -1);
    static Audio = new FileType('音频', 0);
    static Video = new FileType('视频', 1);
    static Picture = new FileType('图片', 2);
    static Document = new FileType('文档', 3);
    static Other = new FileType('其他', 4);
    
    /**
     * implement iterator interface
     */
    static *[Symbol.iterator]() {
      yield this.Org
      yield this.Folder
      yield this.Audio
      yield this.Video
      yield this.Picture
      yield this.Document
      yield this.Other
    }

    static GetName(value){
      for(const type of this){
        if(type.value == value){
          return type.key
        }
      }
      return ''
    }
    
    /**
     * to ant-design-vue select component options
     * @returns { Array }
     */
    static ToOptions() {
      return [...this].map(x => ({ label: x.key, value: x.value }))
    }
    
    /**
     * constructor
     * @param { string } key 
     * @param { number} value 
     */
    constructor(key, value) {
      this.key = key
      this.value = value
    }
}