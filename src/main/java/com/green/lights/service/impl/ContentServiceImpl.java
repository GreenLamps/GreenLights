package com.green.lights.service.impl;

import com.green.lights.service.ContentService;
import com.green.lights.domain.Content;
import com.green.lights.repository.ContentRepository;
import com.green.lights.repository.search.ContentSearchRepository;
import com.green.lights.service.dto.ContentDTO;
import com.green.lights.service.mapper.ContentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Content.
 */
@Service
@Transactional
public class ContentServiceImpl implements ContentService{

    private final Logger log = LoggerFactory.getLogger(ContentServiceImpl.class);

    private final ContentRepository contentRepository;

    private final ContentMapper contentMapper;

    private final ContentSearchRepository contentSearchRepository;

    public ContentServiceImpl(ContentRepository contentRepository, ContentMapper contentMapper, ContentSearchRepository contentSearchRepository) {
        this.contentRepository = contentRepository;
        this.contentMapper = contentMapper;
        this.contentSearchRepository = contentSearchRepository;
    }

    /**
     * Save a content.
     *
     * @param contentDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ContentDTO save(ContentDTO contentDTO) {
        log.debug("Request to save Content : {}", contentDTO);
        Content content = contentMapper.toEntity(contentDTO);
        content = contentRepository.save(content);
        ContentDTO result = contentMapper.toDto(content);
//        contentSearchRepository.save(content);
        return result;
    }

    /**
     *  Get all the contents.
     *
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ContentDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Contents");
        Page<Content> result = contentRepository.findAll(pageable);
        return result.map(content -> contentMapper.toDto(content));
    }

    /**
     *  Get one content by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public ContentDTO findOne(Long id) {
        log.debug("Request to get Content : {}", id);
        Content content = contentRepository.findOne(id);
        ContentDTO contentDTO = contentMapper.toDto(content);
        return contentDTO;
    }

    @Override
    public ContentDTO findOnePre(Long categoryId, Long id) {
        return contentMapper.toDto(contentRepository.findTopByCategoryIdAndIdLessThanOrderByCreateTimeDesc(categoryId, id));
    }

    @Override
    public ContentDTO findOneNext(Long categoryId, Long id) {
        return contentMapper.toDto(contentRepository.findTopByCategoryIdAndIdGreaterThanOrderByCreateTimeDesc(categoryId, id));
    }

    /**
     *  Delete the  content by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Content : {}", id);
        contentRepository.delete(id);
        contentSearchRepository.delete(id);
    }

    /**
     * find by category
     * @param id
     * @param pageable
     * @return
     */
    @Override
    public Page<ContentDTO> findByCategory(Long id, Pageable pageable) {
        Page<Content> result = contentRepository.findByCategory(id, pageable);
        return result.map( content -> contentMapper.toDto(content));
    }

    /**
     * find by category id
     * @param categoryId
     * @return
     */
    @Override
    public ContentDTO findTopByCategoryId(Long categoryId) {
        return contentMapper.toDto(contentRepository.findTopByCategoryIdOrderByHotDesc(categoryId));
    }


    /**
     * Search for the content corresponding to the query.
     *
     *  @param query the query of the search
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<ContentDTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Contents for query {}", query);
        Page<Content> result = contentSearchRepository.search(queryStringQuery(query), pageable);
        return result.map(content -> contentMapper.toDto(content));
    }
}
