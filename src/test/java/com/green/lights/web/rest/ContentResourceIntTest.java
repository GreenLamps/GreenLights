package com.green.lights.web.rest;

import com.green.lights.GreenLightsApp;

import com.green.lights.domain.Content;
import com.green.lights.repository.ContentRepository;
import com.green.lights.service.ContentService;
import com.green.lights.repository.search.ContentSearchRepository;
import com.green.lights.service.dto.ContentDTO;
import com.green.lights.service.mapper.ContentMapper;
import com.green.lights.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.green.lights.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ContentResource REST controller.
 *
 * @see ContentResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GreenLightsApp.class)
public class ContentResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_SOURCE = "AAAAAAAAAA";
    private static final String UPDATED_SOURCE = "BBBBBBBBBB";

    private static final String DEFAULT_AUTHOR = "AAAAAAAAAA";
    private static final String UPDATED_AUTHOR = "BBBBBBBBBB";

    private static final String DEFAULT_COVER = "AAAAAAAAAA";
    private static final String UPDATED_COVER = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final Integer DEFAULT_HOT = 1;
    private static final Integer UPDATED_HOT = 2;

    private static final Integer DEFAULT_STATE = 1;
    private static final Integer UPDATED_STATE = 2;

    private static final Integer DEFAULT_VIEW_COUNT = 1;
    private static final Integer UPDATED_VIEW_COUNT = 2;

    private static final ZonedDateTime DEFAULT_CREATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_CREATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private ContentRepository contentRepository;

    @Autowired
    private ContentMapper contentMapper;

    @Autowired
    private ContentService contentService;

    @Autowired
    private ContentSearchRepository contentSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restContentMockMvc;

    private Content content;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ContentResource contentResource = new ContentResource(contentService);
        this.restContentMockMvc = MockMvcBuilders.standaloneSetup(contentResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Content createEntity(EntityManager em) {
        Content content = new Content()
            .title(DEFAULT_TITLE)
            .source(DEFAULT_SOURCE)
            .author(DEFAULT_AUTHOR)
            .cover(DEFAULT_COVER)
            .content(DEFAULT_CONTENT)
            .hot(DEFAULT_HOT)
            .state(DEFAULT_STATE)
            .viewCount(DEFAULT_VIEW_COUNT)
            .createTime(DEFAULT_CREATE_TIME);
        return content;
    }

    @Before
    public void initTest() {
        contentSearchRepository.deleteAll();
        content = createEntity(em);
    }

    @Test
    @Transactional
    public void createContent() throws Exception {
        int databaseSizeBeforeCreate = contentRepository.findAll().size();

        // Create the Content
        ContentDTO contentDTO = contentMapper.toDto(content);
        restContentMockMvc.perform(post("/api/contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contentDTO)))
            .andExpect(status().isCreated());

        // Validate the Content in the database
        List<Content> contentList = contentRepository.findAll();
        assertThat(contentList).hasSize(databaseSizeBeforeCreate + 1);
        Content testContent = contentList.get(contentList.size() - 1);
        assertThat(testContent.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testContent.getSource()).isEqualTo(DEFAULT_SOURCE);
        assertThat(testContent.getAuthor()).isEqualTo(DEFAULT_AUTHOR);
        assertThat(testContent.getCover()).isEqualTo(DEFAULT_COVER);
        assertThat(testContent.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testContent.getHot()).isEqualTo(DEFAULT_HOT);
        assertThat(testContent.getState()).isEqualTo(DEFAULT_STATE);
        assertThat(testContent.getViewCount()).isEqualTo(DEFAULT_VIEW_COUNT);
        assertThat(testContent.getCreateTime()).isEqualTo(DEFAULT_CREATE_TIME);

        // Validate the Content in Elasticsearch
        Content contentEs = contentSearchRepository.findOne(testContent.getId());
        assertThat(contentEs).isEqualToComparingFieldByField(testContent);
    }

    @Test
    @Transactional
    public void createContentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = contentRepository.findAll().size();

        // Create the Content with an existing ID
        content.setId(1L);
        ContentDTO contentDTO = contentMapper.toDto(content);

        // An entity with an existing ID cannot be created, so this API call must fail
        restContentMockMvc.perform(post("/api/contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contentDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Content> contentList = contentRepository.findAll();
        assertThat(contentList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = contentRepository.findAll().size();
        // set the field null
        content.setTitle(null);

        // Create the Content, which fails.
        ContentDTO contentDTO = contentMapper.toDto(content);

        restContentMockMvc.perform(post("/api/contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contentDTO)))
            .andExpect(status().isBadRequest());

        List<Content> contentList = contentRepository.findAll();
        assertThat(contentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllContents() throws Exception {
        // Initialize the database
        contentRepository.saveAndFlush(content);

        // Get all the contentList
        restContentMockMvc.perform(get("/api/contents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(content.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].source").value(hasItem(DEFAULT_SOURCE.toString())))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR.toString())))
            .andExpect(jsonPath("$.[*].cover").value(hasItem(DEFAULT_COVER.toString())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].hot").value(hasItem(DEFAULT_HOT)))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE)))
            .andExpect(jsonPath("$.[*].viewCount").value(hasItem(DEFAULT_VIEW_COUNT)))
            .andExpect(jsonPath("$.[*].createTime").value(hasItem(sameInstant(DEFAULT_CREATE_TIME))));
    }

    @Test
    @Transactional
    public void getContent() throws Exception {
        // Initialize the database
        contentRepository.saveAndFlush(content);

        // Get the content
        restContentMockMvc.perform(get("/api/contents/{id}", content.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(content.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.source").value(DEFAULT_SOURCE.toString()))
            .andExpect(jsonPath("$.author").value(DEFAULT_AUTHOR.toString()))
            .andExpect(jsonPath("$.cover").value(DEFAULT_COVER.toString()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.hot").value(DEFAULT_HOT))
            .andExpect(jsonPath("$.state").value(DEFAULT_STATE))
            .andExpect(jsonPath("$.viewCount").value(DEFAULT_VIEW_COUNT))
            .andExpect(jsonPath("$.createTime").value(sameInstant(DEFAULT_CREATE_TIME)));
    }

    @Test
    @Transactional
    public void getNonExistingContent() throws Exception {
        // Get the content
        restContentMockMvc.perform(get("/api/contents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateContent() throws Exception {
        // Initialize the database
        contentRepository.saveAndFlush(content);
        contentSearchRepository.save(content);
        int databaseSizeBeforeUpdate = contentRepository.findAll().size();

        // Update the content
        Content updatedContent = contentRepository.findOne(content.getId());
        updatedContent
            .title(UPDATED_TITLE)
            .source(UPDATED_SOURCE)
            .author(UPDATED_AUTHOR)
            .cover(UPDATED_COVER)
            .content(UPDATED_CONTENT)
            .hot(UPDATED_HOT)
            .state(UPDATED_STATE)
            .viewCount(UPDATED_VIEW_COUNT)
            .createTime(UPDATED_CREATE_TIME);
        ContentDTO contentDTO = contentMapper.toDto(updatedContent);

        restContentMockMvc.perform(put("/api/contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contentDTO)))
            .andExpect(status().isOk());

        // Validate the Content in the database
        List<Content> contentList = contentRepository.findAll();
        assertThat(contentList).hasSize(databaseSizeBeforeUpdate);
        Content testContent = contentList.get(contentList.size() - 1);
        assertThat(testContent.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testContent.getSource()).isEqualTo(UPDATED_SOURCE);
        assertThat(testContent.getAuthor()).isEqualTo(UPDATED_AUTHOR);
        assertThat(testContent.getCover()).isEqualTo(UPDATED_COVER);
        assertThat(testContent.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testContent.getHot()).isEqualTo(UPDATED_HOT);
        assertThat(testContent.getState()).isEqualTo(UPDATED_STATE);
        assertThat(testContent.getViewCount()).isEqualTo(UPDATED_VIEW_COUNT);
        assertThat(testContent.getCreateTime()).isEqualTo(UPDATED_CREATE_TIME);

        // Validate the Content in Elasticsearch
        Content contentEs = contentSearchRepository.findOne(testContent.getId());
        assertThat(contentEs).isEqualToComparingFieldByField(testContent);
    }

    @Test
    @Transactional
    public void updateNonExistingContent() throws Exception {
        int databaseSizeBeforeUpdate = contentRepository.findAll().size();

        // Create the Content
        ContentDTO contentDTO = contentMapper.toDto(content);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restContentMockMvc.perform(put("/api/contents")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(contentDTO)))
            .andExpect(status().isCreated());

        // Validate the Content in the database
        List<Content> contentList = contentRepository.findAll();
        assertThat(contentList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteContent() throws Exception {
        // Initialize the database
        contentRepository.saveAndFlush(content);
        contentSearchRepository.save(content);
        int databaseSizeBeforeDelete = contentRepository.findAll().size();

        // Get the content
        restContentMockMvc.perform(delete("/api/contents/{id}", content.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean contentExistsInEs = contentSearchRepository.exists(content.getId());
        assertThat(contentExistsInEs).isFalse();

        // Validate the database is empty
        List<Content> contentList = contentRepository.findAll();
        assertThat(contentList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchContent() throws Exception {
        // Initialize the database
        contentRepository.saveAndFlush(content);
        contentSearchRepository.save(content);

        // Search the content
        restContentMockMvc.perform(get("/api/_search/contents?query=id:" + content.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(content.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].source").value(hasItem(DEFAULT_SOURCE.toString())))
            .andExpect(jsonPath("$.[*].author").value(hasItem(DEFAULT_AUTHOR.toString())))
            .andExpect(jsonPath("$.[*].cover").value(hasItem(DEFAULT_COVER.toString())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].hot").value(hasItem(DEFAULT_HOT)))
            .andExpect(jsonPath("$.[*].state").value(hasItem(DEFAULT_STATE)))
            .andExpect(jsonPath("$.[*].viewCount").value(hasItem(DEFAULT_VIEW_COUNT)))
            .andExpect(jsonPath("$.[*].createTime").value(hasItem(sameInstant(DEFAULT_CREATE_TIME))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Content.class);
        Content content1 = new Content();
        content1.setId(1L);
        Content content2 = new Content();
        content2.setId(content1.getId());
        assertThat(content1).isEqualTo(content2);
        content2.setId(2L);
        assertThat(content1).isNotEqualTo(content2);
        content1.setId(null);
        assertThat(content1).isNotEqualTo(content2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContentDTO.class);
        ContentDTO contentDTO1 = new ContentDTO();
        contentDTO1.setId(1L);
        ContentDTO contentDTO2 = new ContentDTO();
        assertThat(contentDTO1).isNotEqualTo(contentDTO2);
        contentDTO2.setId(contentDTO1.getId());
        assertThat(contentDTO1).isEqualTo(contentDTO2);
        contentDTO2.setId(2L);
        assertThat(contentDTO1).isNotEqualTo(contentDTO2);
        contentDTO1.setId(null);
        assertThat(contentDTO1).isNotEqualTo(contentDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(contentMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(contentMapper.fromId(null)).isNull();
    }
}
