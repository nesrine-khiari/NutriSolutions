import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, VersionColumn } from "typeorm";

export class TimeStampEntity {
    @CreateDateColumn({name: 'created_at', update: false})
    createdAt: Date;
    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date; 
    @DeleteDateColumn({name: 'deleted_at'})
    deleteddAt: Date;
    @VersionColumn()
    version: number;
}

