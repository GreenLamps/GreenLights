package com.green.lights.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.green.lights.service.ContentService;
import com.green.lights.web.rest.util.HeaderUtil;
import com.green.lights.web.rest.util.PaginationUtil;
import com.green.lights.service.dto.ContentDTO;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.time.ZonedDateTime;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Content.
 */
@RestController
@RequestMapping("/api")
public class ContentResource {

    private final Logger log = LoggerFactory.getLogger(ContentResource.class);

    private static final String ENTITY_NAME = "content";

    private final ContentService contentService;

    public ContentResource(ContentService contentService) {
        this.contentService = contentService;
    }

    /**
     * POST  /contents : Create a new content.
     *
     * @param contentDTO the contentDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new contentDTO, or with status 400 (Bad Request) if the content has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/contents")
    @Timed
    public ResponseEntity<ContentDTO> createContent(@Valid @RequestBody ContentDTO contentDTO) throws URISyntaxException {
        log.debug("REST request to save Content : {}", contentDTO);
        if (contentDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new content cannot already have an ID")).body(null);
        }
        contentDTO.setCreateTime(ZonedDateTime.now());
        ContentDTO result = contentService.save(contentDTO);
        return ResponseEntity.created(new URI("/api/contents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /contents : Updates an existing content.
     *
     * @param contentDTO the contentDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated contentDTO,
     * or with status 400 (Bad Request) if the contentDTO is not valid,
     * or with status 500 (Internal Server Error) if the contentDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/contents")
    @Timed
    public ResponseEntity<ContentDTO> updateContent(@Valid @RequestBody ContentDTO contentDTO) throws URISyntaxException {
        log.debug("REST request to update Content : {}", contentDTO);
        if (contentDTO.getId() == null) {
            return createContent(contentDTO);
        }
        contentDTO.setCreateTime(ZonedDateTime.now());
        ContentDTO result = contentService.save(contentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, contentDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /contents : get all the contents.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of contents in body
     */
    @GetMapping("/contents")
    @Timed
    public ResponseEntity<List<ContentDTO>> getAllContents(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Contents");
        Page<ContentDTO> page = contentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/contents");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /contents/:id : get the "id" content.
     *
     * @param id the id of the contentDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the contentDTO, or with status 404 (Not Found)
     */
    @GetMapping("/contents/{id}")
    @Timed
    public ResponseEntity<ContentDTO> getContent(@PathVariable Long id) {
        log.debug("REST request to get Content : {}", id);
        ContentDTO contentDTO = contentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(contentDTO));
    }

    /**
     * DELETE  /contents/:id : delete the "id" content.
     *
     * @param id the id of the contentDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/contents/{id}")
    @Timed
    public ResponseEntity<Void> deleteContent(@PathVariable Long id) {
        log.debug("REST request to delete Content : {}", id);
        contentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * get /content/category/:id : get content by category id
     * @param id
     * @param pageable
     * @return the ResponseEntity with status 200 (OK) and the list of contents in body
     */
    @GetMapping("/contents/category/{id}")
    @Timed
    public ResponseEntity<List<ContentDTO>> getContentByCategory( @PathVariable Long id, @ApiParam Pageable pageable){
        log.debug("REST request to get Content by Category : {}", id);
        Page<ContentDTO> contentDTOPage = contentService.findByCategory(id, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(contentDTOPage, "/api/contents/category/"+id);
        return new ResponseEntity<>(contentDTOPage.getContent(), headers, HttpStatus.OK);

    }

    /**
     * Get /content/category/{id}/{top}
     * @param id
     * @param top
     * @return
     */
    @GetMapping("/contents/category/{id}/{top}")
    @Timed
    public ResponseEntity<List<ContentDTO>> getTopContentByCategory(@PathVariable Long id, @PathVariable int top){
        Pageable pageable = new PageRequest(0, top);
        Page<ContentDTO> contentDTOPage = contentService.findByCategory(id, pageable);
        return new ResponseEntity<>(contentDTOPage.getContent(), HttpStatus.OK);
    }

    /**
     * SEARCH  /_search/contents?query=:query : search for the content corresponding
     * to the query.
     *
     * @param query the query of the content search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/contents")
    @Timed
    public ResponseEntity<List<ContentDTO>> searchContents(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of Contents for query {}", query);
        Page<ContentDTO> page = contentService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/contents");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }


}
