import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {UserInfo} from '../models';
import {UserInfoRepository} from '../repositories';

export class UsersController {
  constructor(
    @repository(UserInfoRepository)
    public UserInfoRepository: UserInfoRepository,
  ) { }

  @post('/users')
  @response(200, {
    description: 'UserInfo model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserInfo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserInfo, {
            title: 'New UserInfo',
            //exclude: ['id'],
          }),
        },
      },
    })
    UserInfo: Omit<UserInfo, 'id'>,
  ): Promise<UserInfo> {
    return this.UserInfoRepository.create(UserInfo);
  }

  @get('/users/count')
  @response(200, {
    description: 'UserInfo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserInfo) where?: Where<UserInfo>,
  ): Promise<Count> {
    return this.UserInfoRepository.count(where);
  }

  @get('/users')
  @response(200, {
    description: 'Array of UserInfo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserInfo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserInfo) filter?: Filter<UserInfo>,
  ): Promise<UserInfo[]> {
    return this.UserInfoRepository.find(filter);
  }

  @patch('/users')
  @response(200, {
    description: 'UserInfo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserInfo, {partial: true}),
        },
      },
    })
    UserInfo: UserInfo,
    @param.where(UserInfo) where?: Where<UserInfo>,
  ): Promise<Count> {
    return this.UserInfoRepository.updateAll(UserInfo, where);
  }

  @get('/users/{id}')
  @response(200, {
    description: 'UserInfo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserInfo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UserInfo, {exclude: 'where'}) filter?: FilterExcludingWhere<UserInfo>
  ): Promise<UserInfo> {
    return this.UserInfoRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @response(204, {
    description: 'UserInfo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserInfo, {partial: true}),
        },
      },
    })
    UserInfo: UserInfo,
  ): Promise<void> {
    await this.UserInfoRepository.updateById(id, UserInfo);
  }

  @put('/users/{id}')
  @response(204, {
    description: 'UserInfo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() UserInfo: UserInfo,
  ): Promise<void> {
    await this.UserInfoRepository.replaceById(id, UserInfo);
  }

  @del('/users/{id}')
  @response(204, {
    description: 'UserInfo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.UserInfoRepository.deleteById(id);
  }
}
