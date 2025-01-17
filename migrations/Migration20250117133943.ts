import { Migration } from '@mikro-orm/migrations';

export class Migration20250117133943 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`chat_history\` (\`id\` int unsigned not null auto_increment primary key, \`message\` text not null, \`url\` text null, \`timestamp\` datetime not null, \`sender_id\` int unsigned not null, \`receiver_id\` int unsigned not null, \`message_type\` enum('text', 'image', 'video') not null, \`is_read\` tinyint(1) not null default false) default character set utf8mb4 engine = InnoDB;`);
    this.addSql(`alter table \`chat_history\` add index \`chat_history_sender_id_index\`(\`sender_id\`);`);
    this.addSql(`alter table \`chat_history\` add index \`chat_history_receiver_id_index\`(\`receiver_id\`);`);

    this.addSql(`alter table \`chat_history\` add constraint \`chat_history_sender_id_foreign\` foreign key (\`sender_id\`) references \`user\` (\`id\`) on update cascade;`);
    this.addSql(`alter table \`chat_history\` add constraint \`chat_history_receiver_id_foreign\` foreign key (\`receiver_id\`) references \`user\` (\`id\`) on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists \`chat_history\`;`);
  }

}
