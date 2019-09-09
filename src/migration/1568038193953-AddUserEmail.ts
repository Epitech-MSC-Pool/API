import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {User} from '../entity/User';

export class AddUserEmail1568038193953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE user add COLUMN email TEXT`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
