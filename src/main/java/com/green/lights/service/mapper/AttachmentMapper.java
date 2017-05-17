package com.green.lights.service.mapper;

import com.green.lights.domain.*;
import com.green.lights.service.dto.AttachmentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Attachment and its DTO AttachmentDTO.
 */
@Mapper(componentModel = "spring", uses = {ContentMapper.class, })
public interface AttachmentMapper extends EntityMapper <AttachmentDTO, Attachment> {
    @Mapping(source = "content.id", target = "contentId")
    AttachmentDTO toDto(Attachment attachment); 
    @Mapping(source = "contentId", target = "content")
    Attachment toEntity(AttachmentDTO attachmentDTO); 
    /**
     * generating the fromId for all mappers if the databaseType is sql, as the class has relationship to it might need it, instead of
     * creating a new attribute to know if the entity has any relationship from some other entity
     *
     * @param id id of the entity
     * @return the entity instance
     */
     
    default Attachment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Attachment attachment = new Attachment();
        attachment.setId(id);
        return attachment;
    }
}
