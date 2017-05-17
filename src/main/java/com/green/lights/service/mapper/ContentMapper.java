package com.green.lights.service.mapper;

import com.green.lights.domain.*;
import com.green.lights.service.dto.ContentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Content and its DTO ContentDTO.
 */
@Mapper(componentModel = "spring", uses = {CategoryMapper.class, })
public interface ContentMapper extends EntityMapper <ContentDTO, Content> {
    @Mapping(source = "category.id", target = "categoryId")
    ContentDTO toDto(Content content); 
    @Mapping(source = "categoryId", target = "category")
    @Mapping(target = "attachments", ignore = true)
    Content toEntity(ContentDTO contentDTO); 
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Content fromId(Long id) {
        if (id == null) {
            return null;
        }
        Content content = new Content();
        content.setId(id);
        return content;
    }
}
