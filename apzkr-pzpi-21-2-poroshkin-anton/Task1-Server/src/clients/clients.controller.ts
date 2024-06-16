import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/AccessTokenGuard';
import { Role } from 'src/auth/types/Role';

@ApiTags('clients')
@ApiBearerAuth()
@Controller('clients')
@UseGuards(AccessTokenGuard(Role.Company))
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  getAll() {
    return this.clientsService.getAll();
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.clientsService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(id, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(id);
  }
}
