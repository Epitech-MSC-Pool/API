import {getRepository, MigrationInterface, QueryRunner} from "typeorm";
import {User} from '../entity/User';

export class CreateUser1568036567393 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        let user = new User();
        user.username = "test";
        user.password = "test";
        //user.hashPassword();
        user.role = "ADMIN";
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
